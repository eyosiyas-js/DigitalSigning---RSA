const {
  initializeApp,
  cert,
} = require('firebase-admin/app')


const { getStorage } = require('firebase-admin/storage')


const app = initializeApp({
  credential: cert({
    type: 'service_account',
    project_id: 'av-signature',
    private_key_id: '38c91f1e098c0ddbd36c253024f643b462849443',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDYmzgL545M7a2A\nriHm1qQxTHIMqHDs0z61kRtYo0LBVV0iJjxRNk0O0px/Oafq03p/8mgGW98wx7wB\n0ZtkXHsZfF5IbWuztOEwn8IaMTaW+GB/fZDhP+fD7eT9fZba44S/vAaEXvVyRKvK\nKs6tz19fFsOsd4e58LcCcpC1uHiE9a6jvm/lqKBoPt7qR0CPgHD/Q5hSnWsM+d1D\nn82Z9FkQcO2S0PVtp9eeFUls+uyo01Bm6pPaFhwRHEKCTey07lsLr8wvWTKs7DL8\nNspcO9X3tz6N2IRjVVescMJ8K4Ua2zvHamLBcIpo2NC/bKo1l++d4yOBOlwiZkXY\n8tuEyCq9AgMBAAECggEABWnrvrBs6BNQsNSpWEGpHOpSN2rGV8T33kXgLxj1hCuE\nBmR6QXVf+6zb6HoibkYW27fNTctiCrATTOBWR+3fzcVD/f9uH7G3pyV3DnyIZsGS\nd91Fj7uvKUB65rMK4DGrkbc7WnedHtwEhysGu2Vhdtj0zwy1wbn4eQEwCLqxmHEX\nwaxsWgNgfSms0AgIhC1t5Bp1nivTbG5IqXfedi09rVcflRjGQ+mGrd+6xbn/JJ9I\nPZPv57dC6FeX68ffKTkoIKuzYvrLKUmO5y4Qq0FszMJZUqX1olTuMVqZ7GrJuJhh\n3Ch+KbTFRRk2C4E25VjB4DNP94hNYZE+SRnTPD8qaQKBgQD2pi5o3X13GgMF1tHW\nPoemQPBg060vo+Bd8QDh5Hz6hTpYuSWy63RNE4KDJGv/6MZTO56m9G9+OmMDsYZd\nmHIG9m/HU5S6ImopxoC4134Nc3UoKTBIUyveYj0sibUv3RZ4J+ZnijdrU6VWOIz2\nsRlqKfiOUGSgYqqfaDfU0ktm3wKBgQDg0XYUZ4v7RcTCncw51YNAqGPTr3mEM2HY\nIhal/0fhbCSe0Xx5GiViAAnD3imDoLoFeWmzb/CZhlAtuL5Y3UurAZWn6r4yguTH\nxBg9sqzlPq/J9/4mIyQT+H63i9N1iHVMcnMNUGVazivMT1nbIIYlB5RJGkmOch3S\ndbbo/cFt4wKBgA88FIHFrIo+wRELQ8rH8fkC6dYRPRFEPgePa06Inm+a6w+v3/Q9\nNuHL4rPW/BTCe/2IITSOxJQ3ZwZDYNlHIUPs1Nqq/vTAS25pJGpGZTLPft0MLj9J\nY9xIlR67IsXiEhE55bFfiCzI7d11gL98EOXN0dx4er6tWXyfI1Ox6ZZhAoGAHMRw\nuZeuX87DqKuMcHITw3hIndO8VuBESuXBxCfwSLYP0Yq4xL5Fvk6G8VtCMKemZgDt\nN5rBTMPVCqSzJqfagN1JCx2MjOYW5EEBYRO17/efgtaK3NJuUWfgvxfTTRzS9Z9H\nfZKmBYKQNCqLMvDseVyI6vnEI8gSbNXHO/UMhUUCgYB9R5WXpDTbXo1/LCXWz9au\nNtfCaZpc9cZnkR5eDggYlqA/eJ4FxA4TsMRrgURUXGXnxlU61fWOPIPMbaXSLLrz\nURhnu1tWsKaSzSNcqeajqz3FhfOjE/cZAkBaJdqvu095Yys9PXVXsGfIykL896Q1\nFSlznH8a3rPnxJl6vpZ1fA==\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-eesl9@av-signature.iam.gserviceaccount.com',
    client_id: '104883229031443174890',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eesl9%40av-signature.iam.gserviceaccount.com',
  }),
  storageBucket: 'av-signature.appspot.com',
})

const storage = getStorage(app)

module.exports = storage
