import { Award, Users, Video } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Helmet } from "react-helmet-async";

export function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Azat Studio</title>
        <meta
          name="description"
          content="Azat Studio jamoasi va kompaniya haqida ma'lumot."
        />
      </Helmet>
      <div className="min-h-screen">
        <section className="bg-linear-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6">Azat Studio haqida</h1>
            <p className="text-xl">
              2015-yildan beri unutilmas to‘y xotiralarini yaratamiz
            </p>
          </div>
        </section>
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl mb-6">Bizning tariximiz</h2>
              <p className="text-gray-700 mb-4">
                2015-yilda tashkil etilgan Azat Studio sizning eng muhim
                kuningizdagi eng qadrli lahzalarni tasvirga olishga
                bag‘ishlangan. Hikoya yaratishga bo‘lgan ishtiyoq va detallarni
                ko‘ra bilish qobiliyati bilan biz kichik jamoadan mintaqadagi
                eng ishonchli to‘y videografiya studiyalaridan biriga aylandik.
              </p>
              <p className="text-gray-700 mb-4">
                Bizning yo‘limiz oddiy g‘oyadan boshlandi: har bir juftlik o‘z
                to‘y kunini nafaqat voqealar, balki his-tuyg‘ular va muhitni aks
                ettiruvchi chiroyli, kino uslubidagi videolar orqali qayta
                yashashga loyiq.
              </p>
              <p className="text-gray-700">
                Yillar davomida biz o‘z mahoratimizni oshirdik, eng yaxshi
                jihozlarga sarmoya kiritdik va mukammallik sari intiladigan
                professional jamoani shakllantirdik.
              </p>
            </div>
            <div className="h-100 bg-gray-200 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771924368428-e71c68d17a08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmlkZW9ncmFwaGVyJTIwdGVhbSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzQ0NTE0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Azat Studio jamoasi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 py-12">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-4xl mb-2">10+</h3>
              <p className="text-xl text-gray-700">Yillik tajriba</p>
              <p className="text-gray-600 mt-2">
                2015-yildan beri mijozlarga sadoqat va professional xizmat
              </p>
            </div>
            <div className="text-center p-8 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="text-white" size={32} />
              </div>
              <h3 className="text-4xl mb-2">500+</h3>
              <p className="text-xl text-gray-700">Bajarilgan loyihalar</p>
              <p className="text-gray-600 mt-2">
                500 dan ortiq to‘ylar suratga olingan va ko‘plab xotiralar
                saqlangan
              </p>
            </div>
            <div className="text-center p-8 bg-pink-50 rounded-lg">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-4xl mb-2">98%</h3>
              <p className="text-xl text-gray-700">Mijozlar mamnunligi</p>
              <p className="text-gray-600 mt-2">
                Mijozlarimizning mamnunligi — eng katta yutug‘imiz
              </p>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-3xl text-center mb-12">Bizning qadriyatlar</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-l-4 border-blue-600 bg-gray-50">
                <h3 className="text-xl mb-3">Sifat birinchi o‘rinda</h3>
                <p className="text-gray-700">
                  Biz hech qachon sifatdan voz kechmaymiz. Suratga olishdan
                  tortib yakuniy montajgacha har bir kadr e’tibor bilan
                  yaratiladi.
                </p>
              </div>
              <div className="p-6 border-l-4 border-purple-600 bg-gray-50">
                <h3 className="text-xl mb-3">Individual yondashuv</h3>
                <p className="text-gray-700">
                  Har bir juftlik o‘ziga xos, har bir to‘y ham shunday. Biz
                  sizning hikoyangiz va orzularingizni tushunishga vaqt
                  ajratamiz.
                </p>
              </div>
              <div className="p-6 border-l-4 border-pink-600 bg-gray-50">
                <h3 className="text-xl mb-3">Professional mukammallik</h3>
                <p className="text-gray-700">
                  Jamoamiz tajribali mutaxassislardan iborat bo‘lib, ular o‘z
                  ishiga mehr bilan yondashadi va mukammallikka intiladi.
                </p>
              </div>
              <div className="p-6 border-l-4 border-green-600 bg-gray-50">
                <h3 className="text-xl mb-3">Abadiy xotiralar</h3>
                <p className="text-gray-700">
                  Biz siz umr bo‘yi qadrlaydigan videolarni yaratamiz, sizning
                  eng muhim kuningizdagi his-tuyg‘ularni aks ettiramiz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
