#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <Windows.h>
#include <wincrypt.h>

#define BUFFER_SIZE 1024
#define HASH_SIZE 16

void calculateFileHash(const char* filePath, unsigned char* hash) {
    HCRYPTPROV hProv;
    HCRYPTHASH hHash;
    BYTE buffer[BUFFER_SIZE];
    DWORD bytesRead;
    DWORD hashSize = HASH_SIZE;

    if (!CryptAcquireContext(&hProv, NULL, NULL, PROV_RSA_AES, CRYPT_VERIFYCONTEXT)) {
        printf("Failed to acquire cryptographic context\n");
        return;
    }

    if (!CryptCreateHash(hProv, CALG_MD5, 0, 0, &hHash)) {
        printf("Failed to create hash object\n");
        CryptReleaseContext(hProv, 0);
        return;
    }

    HANDLE hFile = CreateFile(filePath, GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    if (hFile == INVALID_HANDLE_VALUE) {
        printf("Failed to open file: %s\n", filePath);
        CryptDestroyHash(hHash);
        CryptReleaseContext(hProv, 0);
        return;
    }

    while (ReadFile(hFile, buffer, BUFFER_SIZE, &bytesRead, NULL) && bytesRead > 0) {
        if (!CryptHashData(hHash, buffer, bytesRead, 0)) {
            printf("Failed to hash file\n");
            CryptDestroyHash(hHash);
            CryptReleaseContext(hProv, 0);
            CloseHandle(hFile);
            return;
        }
    }

    if (!CryptGetHashParam(hHash, HP_HASHVAL, hash, &hashSize, 0)) {
        printf("Failed to retrieve hash value\n");
    }

    CryptDestroyHash(hHash);
    CryptReleaseContext(hProv, 0);
    CloseHandle(hFile);
}

void monitorDirectory(const char* directoryPath) {
    HANDLE hDir;
    DWORD dwBufLength;
    DWORD dwBytesReturned;
    char buffer[4096];

    hDir = CreateFile(directoryPath, FILE_LIST_DIRECTORY, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, NULL, OPEN_EXISTING, FILE_FLAG_BACKUP_SEMANTICS, NULL);
    if (hDir == INVALID_HANDLE_VALUE) {
        printf("Failed to open directory: %s\n", directoryPath);
        return;
    }

    while (TRUE) {
        if (ReadDirectoryChangesW(hDir, &buffer, sizeof(buffer), TRUE, FILE_NOTIFY_CHANGE_FILE_NAME, &dwBytesReturned, NULL, NULL)) {
            FILE_NOTIFY_INFORMATION* pNotifyInfo = (FILE_NOTIFY_INFORMATION*)&buffer;

            do {
                WCHAR fileName[MAX_PATH];
                memset(fileName, 0, sizeof(fileName));

                WideCharToMultiByte(CP_UTF8, 0, pNotifyInfo->FileName, pNotifyInfo->FileNameLength / sizeof(WCHAR), (LPSTR)fileName, sizeof(fileName), NULL, NULL);

                unsigned char hash[HASH_SIZE];
                calculateFileHash((const char*)fileName, hash);

                printf("New file detected: %s\n", (char*)fileName);
                printf("File Hash: ");
                for (int i = 0; i < HASH_SIZE; i++) {
                    printf("%02x", hash[i]);
                }
                printf("\n");

                // Compare the calculated hash with the desired hash value
       // Compare the calculated hash with the desired hash value
              unsigned char desiredHash[HASH_SIZE] = { 0x50, 0xf7, 0x04, 0xc6, 0x1d, 0xff, 0xe7, 0x5c, 0x58, 0xfb, 0xa2, 0xc6, 0x9e, 0xc1, 0xc1, 0x3f };


                int match = 1;
                for (int i = 0; i < HASH_SIZE; i++) {
                    if (hash[i] != desiredHash[i]) {
                        match = 0;
                        break;
                    }
                }
                
                if (match) {
                    // Delete the file
                    if (DeleteFileA((const char*)fileName)) {
                        printf("File deleted: %s\n", (char*)fileName);
                    } else {
                        printf("Failed to delete file: %s\n", (char*)fileName);
                    }
                }

                pNotifyInfo = (FILE_NOTIFY_INFORMATION*)((LPBYTE)pNotifyInfo + pNotifyInfo->NextEntryOffset);
            } while (pNotifyInfo->NextEntryOffset != 0);
        }
    }

    CloseHandle(hDir);
}

int main() {
    const char* directoryPath = "./";

    monitorDirectory(directoryPath);

    return 0;
}
