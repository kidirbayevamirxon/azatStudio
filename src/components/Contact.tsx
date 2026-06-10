import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    location: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form yuborildi:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        weddingDate: "",
        location: "",
        message: "",
      });
    }, 3000);
  };

  return (
<>
<Helmet>
  <title>Contact Us | Azat Studio</title>
  <meta
    name="description"
    content="Azat Studio bilan bog'laning. Web development va IT xizmatlari bo'yicha murojaat qiling."
  />
</Helmet>
    <div className="min-h-screen">
      <section className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Bog‘lanish</h1>
          <p className="text-xl">
            Keling, to‘yingiz haqida gaplashamiz va uni qanday tasvirga olishimizni muhokama qilamiz
          </p>
        </div>
      </section>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Telefon</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 mt-1">Du-Ju 9:00–18:00</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Email</h3>
                <p className="text-gray-600">info@azatstudio.com</p>
                <p className="text-sm text-gray-500 mt-1">
                  24 soat ichida javob beramiz
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg mb-1">Ofis</h3>
                <p className="text-gray-600">123 Wedding Lane</p>
                <p className="text-sm text-gray-500">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl mb-3">Xabar yuborish</h2>
          <p className="text-gray-600">
            Quyidagi formani to‘ldiring, biz siz bilan tez orada bog‘lanamiz
          </p>
        </div>
        {isSubmitted ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl mb-2">Rahmat!</h3>
            <p className="text-gray-700">
              Xabaringiz muvaffaqiyatli yuborildi. 24 soat ichida siz bilan bog‘lanamiz.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Ismingiz *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ali & Valya"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email manzil *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="siz@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+998 90 000 00 00"
                />
              </div>
              <div>
                <label htmlFor="weddingDate" className="block text-sm mb-2">
                  To‘y sanasi
                </label>
                <input
                  type="date"
                  id="weddingDate"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="location" className="block text-sm mb-2">
                To‘y manzili
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Restoran yoki shahar nomi"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm mb-2">
                Xabar *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="To‘yingiz haqida, rejalaringiz va maxsus talablaringizni yozing..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Xabar yuborish
            </button>
          </form>
        )}
      </section> */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-8">Studiyamizga tashrif buyuring</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.9599286874964!2d58.850836400000006!3d43.0422746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41c2b59e09b00f41%3A0x7a952a21996a1e21!2sAzatStudi!5e0!3m2!1sru!2s!4v1775145249506!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Azat Studio joylashuvi"
              ></iframe>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl mb-3">Manzil</h3>
                  <p className="text-gray-700 mb-2">Azat Studio</p>
                  <p className="text-gray-700 mb-2">Qo'ng'irot 2VR2</p>
                  <p className="text-gray-700 mb-4">2VR2+X79, Qo‘ng‘irot, Qoraqalpog’iston Respublikasi, Узбекистан</p>
                  <p className="text-sm text-gray-600">
                    Bepul parking mavjud. Tashrif faqat oldindan kelishilgan holda.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-3">Ish vaqti</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Dushanba - Juma:</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shanba:</span>
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yakshanba:</span>
                      <span>Kelishuv asosida</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Dam olish kunlari ko‘pincha to‘ylarda bo‘lamiz. Iltimos,
                    tashrifdan oldin qo‘ng‘iroq qiling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
 </> );
}