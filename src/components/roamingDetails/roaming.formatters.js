import * as Papa from 'papaparse';
import { HEADING_INDEXES, RULES, SWEDEN_TO_COUNTRY_DATA, SWEDEN_TO_COUNTRY_INDEXES } from './roaming.constants';

export const FormattedRoamingObject = () => {
  const hugeArray = Papa.parse(RULES).data.slice(1);
  const formattedObject = {};
  hugeArray.forEach((row) => {
    formattedObject[row[HEADING_INDEXES.CountryName]] = {
      name: row[HEADING_INDEXES.CountryName],
      zoneId: row[HEADING_INDEXES.ZoneId],
      zone: row[HEADING_INDEXES.Zone],
      isEUCountry: row[HEADING_INDEXES.EUFlag] === 'EU',
      camelRoaming: row[HEADING_INDEXES.CamelRoaming] === 'Yes',
      connectionFee: Number(row[HEADING_INDEXES.SetupFee]),
      zoneRatesPerMinute: row[HEADING_INDEXES.ZoneRatesPerMinute[1]] ? {
        1: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[1]]),
        2: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[2]]),
        3: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[3]]),
        4: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[4]]),
        5: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[5]]),
        6: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[6]]),
        7: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[7]]),
        8: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[8]]),
        9: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[9]]),
        10: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[10]]),
        11: Number(row[HEADING_INDEXES.ZoneRatesPerMinute[11]])
      } : {},
      outboundCall: Number(row[HEADING_INDEXES.NationalRoamingCall]),
      inboundCall: Number(row[HEADING_INDEXES.ReceiveCall]),
      smsUnitPrice: Number(row[HEADING_INDEXES.SMSUnitPrice]),
      mmsUnitPrice: Number(row[HEADING_INDEXES.MMSUnitPrice]),
      dataPerMb: Number(row[HEADING_INDEXES.DataPricePerMB])
    };
  });
  return formattedObject;
};

export const SwedenToCountryData = () => {
  const swedenRates = Papa.parse(SWEDEN_TO_COUNTRY_DATA).data;
  const formattedObject = {};
  swedenRates.forEach((row) => {
    formattedObject[row[SWEDEN_TO_COUNTRY_INDEXES.Name]] = {
      countryName: row[SWEDEN_TO_COUNTRY_INDEXES.Name],
      setupFee: Number(row[SWEDEN_TO_COUNTRY_INDEXES.SetupFee]),
      toMobilePerMin: Number(row[SWEDEN_TO_COUNTRY_INDEXES.ToMobilePerMin]),
      toFixedPerMin: Number(row[SWEDEN_TO_COUNTRY_INDEXES.ToFixedPerMin]),
      SMS: Number(row[SWEDEN_TO_COUNTRY_INDEXES.SMS]),
      MMS: Number(row[SWEDEN_TO_COUNTRY_INDEXES.MMS])
    };
  });
  return formattedObject;
};
