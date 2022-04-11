export const mapSubscriberConsents = (consentArray, consentAcknowledged, promotionalConsentIds) => {
  let isError = false;
  const acknowledged = {};
  let nonRequiredConsent = false;
  let subscriberConsents = consentArray.map((consent) => {
    // look for errors
    if (!consentAcknowledged[consent.type].accepted && consent.required) {
      isError = true;
    } else if (consentAcknowledged[consent.type].accepted && !consent.required) {
      nonRequiredConsent = true;
    }
    // rebuild state data with errors
    acknowledged[consent.type] = {
      accepted: consentAcknowledged[consent.type].accepted,
      error: !consentAcknowledged[consent.type].accepted && consent.required
    };

    // build data for update subscriber
    return {
      ConfigConsentId: consent.type,
      ConsentAccepted: consentAcknowledged[consent.type].accepted
    };
  });

  if (!isError) {
    subscriberConsents = subscriberConsents.concat(
      promotionalConsentIds.map((consentId) => ({
        ConfigConsentId: consentId,
        ConsentAccepted: nonRequiredConsent
      }))
    );
  }

  return {
    acknowledged,
    isError,
    subscriberConsents
  };
};