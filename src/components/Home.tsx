import { Link } from "react-router";
import { Play, Camera, Heart } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Azat Studio | Web Development & Design</title>
        <meta
          name="description"
          content="Azat Studio - zamonaviy web development, UI/UX design va IT yechimlar. Biznesingiz uchun professional veb saytlar yaratamiz."
        />
      </Helmet>
      <div className="min-h-screen">
        <section className="relative h-150 flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6">Azat Studio</h1>
            <p className="text-xl md:text-2xl mb-8">
              Sizning mukammal to‘y lahzalaringizni tasvirga olamiz
            </p>
            <p className="text-lg mb-8">
              Sizning noyob sevgi hikoyangizni aks ettiruvchi professional
              videolar
            </p>
            <Link
              to="/projects"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ishlarimizni ko‘rish
            </Link>
          </div>
        </section>
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl mb-3">Professional sifat</h3>
              <p className="text-gray-600">
                Zamonaviy uskunalar va tajribali videograflar
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl mb-3">Kino uslubi</h3>
              <p className="text-gray-600">
                Har bir his-tuyg‘uni aks ettiruvchi chiroyli hikoya
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-pink-600" size={32} />
              </div>
              <h3 className="text-xl mb-3">Sizning hikoyangiz</h3>
              <p className="text-gray-600">
                Sizning sevgingizni aks ettiruvchi individual videolar
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6">
              Boshlashga tayyormisiz?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Keling, birga chiroyli loyiha yarataylik
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bog‘lanish
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
