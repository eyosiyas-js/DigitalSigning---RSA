#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <Windows.h>

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
        if (ReadDirectoryChangesW(hDir, &buffer, sizeof(buffer), TRUE, FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_SIZE, &dwBytesReturned, NULL, NULL)) {
            FILE_NOTIFY_INFORMATION* pNotifyInfo = (FILE_NOTIFY_INFORMATION*)&buffer;

            do {
                WCHAR fileName[MAX_PATH];
                memset(fileName, 0, sizeof(fileName));

                WideCharToMultiByte(CP_UTF8, 0, pNotifyInfo->FileName, pNotifyInfo->FileNameLength / sizeof(WCHAR), (LPSTR)fileName, sizeof(fileName), NULL, NULL);
                printf("New file detected: %s\n", (char*)fileName);

                pNotifyInfo = (FILE_NOTIFY_INFORMATION*)((LPBYTE)pNotifyInfo + pNotifyInfo->NextEntryOffset);
            } while (pNotifyInfo->NextEntryOffset != 0);
        }
    }

    CloseHandle(hDir);
}

int main() {
    const char* directoryPath = "C:\\";

    monitorDirectory(directoryPath);

    return 0;
}
