import { Check } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Helmet } from "react-helmet-async";

export function Services() {
  const { services } = useData();

  return (
    <>
      <Helmet>
        <title>Services | Azat Studio</title>
        <meta
          name="description"
          content="Web development, UI/UX design va IT xizmatlari."
        />
      </Helmet>
      <div className="min-h-screen">
        <section className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6">Xizmatlarimiz</h1>
            <p className="text-xl">
              Sizning ehtiyojlaringizga moslashtirilgan to‘liq to‘y videografiya
              paketlari
            </p>
          </div>
        </section>
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              return (
                <div
                  key={service.id}
                  className="p-6 rounded-lg border-2 border-pink-200 bg-pink-50 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl mb-2 font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <Check
                          className="text-pink-600 mr-2 shrink-0"
                          size={18}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-8">
              Nega bizning xizmatlarni tanlash kerak?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl mb-3">Professional uskunalar</h3>
                <p className="text-gray-700">
                  Biz eng so‘nggi 4K kameralar, professional audio uskunalar va
                  stabilizatsiya jihozlaridan foydalanamiz, bu esa yuqori
                  sifatli video ta’minlaydi.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl mb-3">Tajribali jamoa</h3>
                <p className="text-gray-700">
                  Bizning videograflar ko‘p yillik tajribaga ega va to‘y
                  jarayonini bezovta qilmasdan eng muhim lahzalarni tasvirga
                  olishni biladi.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl mb-3">Tez tayyorlash</h3>
                <p className="text-gray-700">
                  To‘y kuningizdan keyin 4-6 hafta ichida highlight video, 8-10
                  hafta ichida esa to‘liq video tayyor bo‘ladi.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl mb-3">Moslashuvchan paketlar</h3>
                <p className="text-gray-700">
                  Sizga mos paketni tanlash uchun xizmatlarni aralashtirib
                  sozlashingiz mumkin. Biz moslashuvchan va qulaymiz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
