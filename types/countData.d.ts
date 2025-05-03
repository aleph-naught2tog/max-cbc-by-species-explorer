type CommonName = string;
type ScientificName = string;
type FloatAsString = string;
type AbsoluteCountYear = number;

type BirdMap = Record<
  ScientificName,
  Record<AbsoluteCountYear, { howMany: number; numberByPartyHours: number }>
>;

interface CountData {
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
  checklist: P5Table;
  compilers: P5Table;
  effort: P5Table;
  latLon: { lat: FloatAsString; lon: FloatAsString };
  orgs: P5Table;
  participants: P5Table;
  weather: P5Table;
}
