import {
  getDigimonById,
  getAttributeById,
  getLevelById,
  getFieldById,
  getTypeById,
} from '@/lib/api';
import Image from 'next/image';
import { EvolutionsSection } from '../../components/EvolutionsSection';
import { Tooltip } from '../../components/Tooltip'; // componente simple de tooltip

interface DigimonSkill {
  id: number;
  skill: string;
  translation: string;
  description: string;
}

interface DigimonDescription {
  origin: string;
  language: string;
  description: string;
}

interface DigimonField {
  id: number;
  field: string;
  image: string;
}

export default async function DigimonDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const digimon = await getDigimonById(Number(id));

  // Descripciones
  const englishDesc = digimon.descriptions?.find(
    (d: DigimonDescription) => d.language === 'en_us',
  )?.description;
  const japaneseDesc = digimon.descriptions?.find(
    (d: DigimonDescription) => d.language === 'jap',
  )?.description;

  // Datos enriquecidos
  const attribute = digimon.attributes?.[0];
  const level = digimon.levels?.[0];
  const type = digimon.types?.[0];

  const attributeDetail = attribute ? await getAttributeById(attribute.id) : null;
  const levelDetail = level ? await getLevelById(level.id) : null;
  const typeDetail = type ? await getTypeById(type.id) : null;

  // Para fields, hacemos fetch en paralelo
  const fieldsDetail = digimon.fields
    ? await Promise.all(
        digimon.fields.map(async (f: DigimonField) => {
          const detail = await getFieldById(f.id);
          return { ...f, detail };
        }),
      )
    : [];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {digimon.name}
        {digimon.xAntibody && (
          <span className="ml-3 align-middle inline-block bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
            X-Antibody
          </span>
        )}
      </h1>

      {digimon.images?.[0] && (
        <Image
          src={digimon.images[0].href}
          alt={digimon.name}
          width={200}
          height={200}
          className="mx-auto mb-6"
        />
      )}

      {/* Nivel */}
      <div className="text-lg">
        Nivel:{' '}
        {levelDetail ? (
          <Tooltip label={levelDetail?.description ?? 'Descripción no disponible'}>
            <span className="cursor-help text-yellow-300">{level.level}</span>
          </Tooltip>
        ) : (
          (level?.level ?? 'Desconocido')
        )}
      </div>

      {/* Tipo */}
      <div className="text-lg">
        Tipo:{' '}
        {typeDetail ? (
          <Tooltip label={typeDetail.description ?? 'Descripción no disponible'}>
            <span className="cursor-help text-yellow-300">{type.type}</span>
          </Tooltip>
        ) : (
          (type?.type ?? 'Desconocido')
        )}
      </div>

      {/* Atributo */}
      <div className="text-lg">
        Atributo:{' '}
        {attributeDetail ? (
          <Tooltip label={attributeDetail?.description ?? 'Descripción no disponible'}>
            <span className="cursor-help text-yellow-300">{attribute.attribute}</span>
          </Tooltip>
        ) : (
          (attribute?.attribute ?? 'Desconocido')
        )}
      </div>

      {/* Fields */}
      {fieldsDetail.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Fields</h2>
          <div className="flex flex-wrap gap-4">
            {fieldsDetail.map((f) => (
              <Tooltip key={f.id} label={f.detail?.description ?? 'Descripción no disponible'}>
                <div className="flex items-center gap-2 cursor-help bg-gray-800 rounded px-3 py-2">
                  <Image src={f.image} alt={f.field} width={40} height={40} />
                  <span className="text-lg">{f.field}</span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      {/* Descripción */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Descripción</h2>
        <p className="text-lg">{englishDesc || 'Sin descripción disponible'}</p>
        {japaneseDesc && (
          <details className="mt-2">
            <summary className="cursor-pointer text-yellow-400">Ver en Japonés</summary>
            <p className="text-lg mt-1">{japaneseDesc}</p>
          </details>
        )}
      </div>

      {/* Skills */}
      <h2 className="text-2xl font-bold mt-6">Skills</h2>
      <ul className="list-disc pl-6">
        {digimon.skills?.map((s: DigimonSkill) => (
          <li key={s.id}>
            <strong>{s.skill}</strong>: {s.description}
          </li>
        ))}
      </ul>

      {/* Evoluciones */}
      <EvolutionsSection title="Evoluciones Previas" evolutions={digimon.priorEvolutions} />
      <EvolutionsSection title="Evoluciones Siguientes" evolutions={digimon.nextEvolutions} />
    </main>
  );
}
