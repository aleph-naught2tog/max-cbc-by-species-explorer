type CommonName = string;
type ScientificName = string;
type FloatAsString = string;
type AbsoluteCountYear = string;
type NumberAsString = string;

/*
For Cloud Cover, A.M. or P.M., indicate the condition that was true most of the time.
Local Fog means that only portions of the count circle had fog for most of the period, while Foggy means
the entire circle had fog. Clear = 0-15% clouds, Partly Cloudy = 15-33% clouds, Partly Clear = 33-66%
clouds, Cloudy = 66-100% clouds
*/
type CloudCover = string;

/*
For A.M./P.M. Rain/Snow, record all conditions that were true. For example, if
the morning started with drizzle that developed into heavy rain, the
"Rain
" boxes should have both
"light
" and
"heavy
" checked for the A.M.
*/
type RainStatus = string;

interface CBCWeatherData {
  CountYear: NumberAsString;
  HighTemp: NumberAsString;
  LowTemp: NumberAsString;
  AMCloud: CloudCover;
  AMRain: RainStatus;
  AMSnow: string;
  PMClouds: CloudCover;
  PMRain: RainStatus;
  PMSnow: string;
}

type CountDatum = {
  howMany: number;
  numberByPartyHours: number;
};

type CountDatumKey = keyof CountDatum;

type CountMaps = Record<AbsoluteCountYear, CountDatum>;

type BirdMap = Record<ScientificName, CountMaps>;

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

type TableCountData = Omit<
  CountData,
  'name' | 'code' | 'birdList' | 'birdMap' | 'latLon'
>;

type CountDataTableKeys = keyof TableCountData;
