import {
  getDigimonById,
  getAttributeById,
  getLevelById,
  getFieldById,
  getTypeById,
} from '@/lib/api';
import Image from 'next/image';
import { EvolutionsSection } from '../../components/EvolutionsSection';
import { Tooltip } from '../../components/Tooltip';

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

  const englishDesc = digimon.descriptions?.find(
    (d: DigimonDescription) => d.language === 'en_us',
  )?.description;
  const japaneseDesc = digimon.descriptions?.find(
    (d: DigimonDescription) => d.language === 'jap',
  )?.description;

  const attribute = digimon.attributes?.[0];
  const level = digimon.levels?.[0];
  const type = digimon.types?.[0];

  const attributeDetail = attribute ? await getAttributeById(attribute.id) : null;
  const levelDetail = level ? await getLevelById(level.id) : null;
  const typeDetail = type ? await getTypeById(type.id) : null;

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

      <div className="text-lg">
        Level:{' '}
        {levelDetail ? (
          <Tooltip label={levelDetail?.description ?? 'Description not available'}>
            <span className="cursor-help text-yellow-300">{level.level}</span>
          </Tooltip>
        ) : (
          (level?.level ?? 'Unknown')
        )}
      </div>

      <div className="text-lg">
        Type:{' '}
        {typeDetail ? (
          <Tooltip label={typeDetail.description ?? 'Description not available'}>
            <span className="cursor-help text-yellow-300">{type.type}</span>
          </Tooltip>
        ) : (
          (type?.type ?? 'Unknown')
        )}
      </div>

      <div className="text-lg">
        Attribute:{' '}
        {attributeDetail ? (
          <Tooltip label={attributeDetail?.description ?? 'Description not available'}>
            <span className="cursor-help text-yellow-300">{attribute.attribute}</span>
          </Tooltip>
        ) : (
          (attribute?.attribute ?? 'Unknown')
        )}
      </div>

      {/* Fields */}
      {fieldsDetail.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Fields</h2>
          <div className="flex flex-wrap gap-4">
            {fieldsDetail.map((f) => (
              <Tooltip key={f.id} label={f.detail?.description ?? 'Description not available'}>
                <div className="flex items-center gap-2 cursor-help bg-gray-800 rounded px-3 py-2">
                  <Image src={f.image} alt={f.field} width={40} height={40} />
                  <span className="text-lg">{f.field}</span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p className="text-lg">{englishDesc || 'No description available'}</p>
        {japaneseDesc && (
          <details className="mt-2">
            <summary className="cursor-pointer text-yellow-400">View in Japanese</summary>
            <p className="text-lg mt-1">{japaneseDesc}</p>
          </details>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-6">Skills</h2>
      <ul className="list-disc pl-6">
        {digimon.skills?.map((s: DigimonSkill) => (
          <li key={s.id}>
            <strong>{s.skill}</strong>: {s.description}
          </li>
        ))}
      </ul>

      <EvolutionsSection title="Previous Evolutions" evolutions={digimon.priorEvolutions} />
      <EvolutionsSection title="Next Evolutions" evolutions={digimon.nextEvolutions} />
    </main>
  );
}
