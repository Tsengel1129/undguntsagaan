# DEMO шалгах жагсаалт — Өндгөн цагаан

## Бэлтгэл (нэг удаа)

1. `.env.local` дотор Firebase-ийн ЖИНХЭНЭ утгуудыг бөглөнө
   (`FIREBASE_SERVICE_ACCOUNT_KEY` = service account JSON бүтнээрээ, нэг мөрөнд).
2. `npm run seed` — одоогийн бүх контентыг Firestore руу хуулна.
3. Firebase Console → Firestore Rules хэсэгт `firestore.rules` файлын агуулгыг,
   Storage Rules хэсэгт `storage.rules` файлын агуулгыг хуулж тавина.
4. `npm run dev` — сайт http://localhost:3000

## Шалгах алхмууд

- [ ] **Нэвтрэх**: `/admin` → и-мэйл + нууц үгээр нэвтрэх (ADMIN_EMAILS дэх
      хаяг). ADMIN_EMAILS-д байхгүй хэрэглэгч нэвтэрвэл "Хандах эрхгүй
      байна" гарна.
- [ ] **Шинэ мэдээ нэмэх**: Сэтгүүл → "Шинэ нэмэх" → талбаруудыг бөглөж
      "Нийтлэх" → Нүүр хуудасны "Latest stories" болон /magazine жагсаалтын
      ХАМГИЙН ЭХЭНД гарч байгааг шалгах (60 сек дотор).
- [ ] **Дутуу талбартай нийтлэхийг хориглох**: шинэ бичлэг дээр зөвхөн гарчиг
      бөглөөд "Нийтлэх" → "Дутуу талбарууд: ..." алдаа гарна.
- [ ] **Засах**: аль нэг нийтлэгдсэн морины товч тайлбар, нүүр зургийг (шинэ
      URL) солиод "Хадгалах" → public хуудсанд өөрчлөлт гарсан, байрлал
      ӨӨРЧЛӨГДӨӨГҮЙ байхыг шалгах.
- [ ] **Тогтоох (pin)**: жагсаалтад 📌 дараад дугаар өгөх → public хуудсанд
      хамгийн эхэнд гарна.
- [ ] **Дугаарын морь солих**: Нүүр хуудас → өөр морь сонгоод Хадгалах →
      нүүрний "Horse of the issue" солигдоно.
- [ ] **Зураг upload**: засварын "Зураг" хэсэгт "Зураг ⬆" → файл сонгох →
      preview гарч, хадгалсны дараа public дээр харагдана (татаж авах token
      URL ашиглана).
- [ ] **Устгах**: "Устгах" → "Устгахдаа итгэлтэй байна уу?" баталгаажуулалт →
      public хуудаснаас алга болно.
- [ ] **Ноорог болгох**: нийтлэгдсэн бичлэгийг "Ноорог болгох" → public
      хуудаснаас түр алга болно, админд "Ноорог" бүлэгт очно.
- [ ] **Тохиргоо**: Тохиргоо → tagline солих → footer дээр шинэчлэгдэнэ.

## Локал туршилт (жинхэнэ түлхүүргүйгээр)

```bash
# 1-р терминал: emulators (Java шаардана)
PATH="/opt/homebrew/opt/openjdk/bin:$PATH" npx firebase-tools emulators:start --project <PROJECT_ID>

# 2-р терминал: seed + dev
FIRESTORE_EMULATOR_HOST=localhost:8080 npm run seed
FIRESTORE_EMULATOR_HOST=localhost:8080 FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 \
  NEXT_PUBLIC_USE_FIREBASE_EMULATORS=1 npm run dev
```

Emulator горимд нэвтрэхийн өмнө Auth emulator-т хэрэглэгч үүсгэх хэрэгтэй
(жишээ нь Admin SDK-ийн createUser, эсвэл emulator UI). Production дээр
нууц үгийг Firebase Console → Authentication → Users хэсгээс солино.
