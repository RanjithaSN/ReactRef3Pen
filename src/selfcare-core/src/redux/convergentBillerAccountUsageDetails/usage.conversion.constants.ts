const DATA_CONVERSION = {
    BYTES_TO_GIGABYTES: (1024 * 1024 * 1024),
    KILOBYTES_TO_GIGABYTES: (1024 * 1024),
    MEGABYTES_TO_GIGABYTES: (1024),
    GIGABYTE: 1
};
export const MEASUREMENT_CONSTANTS = {
    4: {
        type: 'Bytes',
        conversionToGigabytes: DATA_CONVERSION.BYTES_TO_GIGABYTES
    },
    5: {
        type: 'Kilobytes',
        conversionToGigabytes: DATA_CONVERSION.KILOBYTES_TO_GIGABYTES
    },
    6: {
        type: 'Megabytes',
        conversionToGigabytes: DATA_CONVERSION.MEGABYTES_TO_GIGABYTES
    },
    7: {
        type: 'Gigabytes',
        conversionToGigabytes: DATA_CONVERSION.GIGABYTE
    }
};
