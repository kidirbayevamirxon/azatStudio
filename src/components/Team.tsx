import { useData } from "../contexts/DataContext";
import { Helmet } from "react-helmet-async";

export function Team() {
  const { teamMembers } = useData();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior":
        return "bg-purple-100 text-purple-800";
      case "Mid-Level":
        return "bg-blue-100 text-blue-800";
      case "Junior":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Team | Azat Studio</title>
        <meta
          name="description"
          content="Azat Studio jamoasi bilan tanishing. Professional dasturchilar va mutaxassislar jamoasi."
        />
      </Helmet>
      <div className="min-h-screen">
        <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6">Bizning jamoa</h1>
            <p className="text-xl">
              Sizning muhim kuningizni tasvirga olishga bag‘ishlangan
              professional jamoa
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const specialtiesArray = member.specialties
                ? member.specialties.split(",").map((s) => s.trim())
                : [];

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {member.position}
                    </p>
                    <p className="text-blue-600 mb-2">{member.role}</p>

                    <p className="text-sm text-blue-500 mb-3">
                      <a
                        href={`https://t.me/${member.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {member.telegram}
                      </a>
                    </p>

                    <div className="mb-4">
                      <p className="text-sm mb-2">Yo‘nalishlar:</p>
                      <div className="flex flex-wrap gap-2">
                        {specialtiesArray.length > 0 ? (
                          specialtiesArray.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">
                            Yo‘nalishlar ko‘rsatilmagan
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl mb-6">
              Nega bizning jamoa ajralib turadi?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Azat Studio’da biz ajoyib to‘y videolari texnik mahorat, ijodiy
              yondashuv va mijozlarga bo‘lgan samimiy e’tibor uyg‘unligidan
              kelib chiqadi deb hisoblaymiz. Bizning jamoamiz turli kuchli
              tomonlar va qarashlarga ega bo‘lib, sizning muhim kuningizni
              to‘liq qamrab olishni ta’minlaydi.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl mb-3">Jamoaviy yondashuv</h3>
                <p className="text-gray-700">
                  Bizning jamoa a’zolari birgalikda ishlaydi va har biri o‘z
                  tajribasini qo‘shib, mukammal yakuniy natija yaratadi.
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl mb-3">Doimiy rivojlanish</h3>
                <p className="text-gray-700">
                  Biz eng so‘nggi texnologiya va usullarni o‘rganib boramiz,
                  sizga zamonaviy xizmatlarni taqdim etish uchun.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
