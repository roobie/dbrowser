export default {
  get<T>(resource: string): Promise<T> {
    return new Promise((resolve) => {
      if (resource === "columns") {
        resolve({
          collectionaccount: [
            "collectionaccountid",
            "debtcreditorid",
            "solicitorpartyid",
          ],
          party: ["partyid", "name"],
        } as T);
      } else if (resource === "keys") {
        resolve({
          primary: {
            collectionaccount: "collectionaccountid",
            party: "partyid",
          },
          foreign: {
            collectionaccount: {
              debtcreditorid: {
                referencedTable: "party",
                foreignKeyColumn: "debtcreditorid",
              },
              solicitorpartyid: {
                referencedTable: "party",
                foreignKeyColumn: "solicitorpartyid",
              },
            },
          },
        } as T);
      } else if (resource === "tables") {
        resolve([
          "collectionaccount",
          "party",
        ] as T);
      } else if (resource === "data") {
        resolve({
          collectionaccount: [
            { collectionaccountid: 1, debtcreditorid: 2, solicitorpartyid: 1 },
            { collectionaccountid: 2, debtcreditorid: 3, solicitorpartyid: 1 },
            { collectionaccountid: 3, debtcreditorid: 3, solicitorpartyid: 1 },
          ],
          party: [
            { partyid: 1, name: "ombud" },
            { partyid: 2, name: "Testarbolaget Syd AB" },
            { partyid: 3, name: "ACME Corp LLC" },
          ],
        } as T);
      }
    });
  },
};
