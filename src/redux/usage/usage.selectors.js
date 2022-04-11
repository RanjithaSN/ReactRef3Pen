import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems, CodeLoaded } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { Services } from '../account/account.selectors';

const EMPTY_ARRAY = Immutable([]);
const EMPTY_OBJECT = {};

export const AllServiceEntitlements = createSelector([
  CodeLoaded(CODES.UnitOfMeasure),
  CodeItems(CODES.UnitOfMeasure),
  Services,
  SelectedLocale
], (unitOfMeasureLoaded, unitOfMeasure, services, locale) => {
  if (unitOfMeasureLoaded) {
    const allUsage = {};

    services.forEach((service) => {
      const serviceIdentifier = pathOr('', ['ServiceIdentifier', 'Value'], service);
      const limitedUsage = Immutable.asMutable(pathOr(EMPTY_ARRAY, ['EntitlementBalances'], service)
        .filter(({ Unlimited }) => (!Unlimited)))
        .sort((a, b) => ((new Date(a.ExpirationDate) < new Date(b.ExpirationDate)) ? 1 : -1))
        .map((usage) => {
          const unit = unitOfMeasure.find(({ Value }) => (Value === usage.BalanceUnitCode));
          return usage.set('BalanceConsumed', Number(pathOr(0, ['BalanceConsumed'], usage).toFixed(2)))
            .set('ExpirationDate', usage.ExpirationDate ? formatDate(new Date(usage.ExpirationDate), locale) : null)
            .set('unitOfMeasure', pathOr(unit.Name, ['AdditionalProperties', 'short_name'], unit));
        });
      allUsage[serviceIdentifier] = limitedUsage;
    });

    return allUsage;
  }
  return EMPTY_OBJECT;
});
