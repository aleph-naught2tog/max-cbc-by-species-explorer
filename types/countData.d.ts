type CommonName = string;
type ScientificName = string;
type FloatAsString = string;
type AbsoluteCountYear = string;

type BirdMap = Record<
  ScientificName,
  Record<
    AbsoluteCountYear,
    { howMany: number; numberByPartyHours: number }
  >
>;

interface BaseCountData {
  /**
   * The name of the area
   */
  name: string;
  /**
   * The shortcode identifier for the area
   */
  code: string;
  birdList: CommonName[];
  birdMap: BirdMap;
  latLon: { lat: FloatAsString; lon: FloatAsString };
  checklist?: P5Table;
  compilers?: P5Table;
  effort?: P5Table;
  orgs?: P5Table;
  participants?: P5Table;
  weather?: P5Table;
}

type CountData = Required<BaseCountData>;

type TableCountData = Omit<CountData, 'name' | 'code' | 'birdList' | 'birdMap' | 'latLon'>;

type CountDataTableKeys = keyof TableCountData;
