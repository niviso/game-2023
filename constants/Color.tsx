const Color = {
  primary: {
    slot_01: "#77ADFF",
    slot_02: "#77FF9D",
    slot_03: "#FC77FF",
    slot_04: "#FF7777",
    slots: {
      slot_01: "#77ADFF",
      slot_02: "#77FF9D",
      slot_03: "#FC77FF",
      slot_04: "#FF7777",
    },
    textPrimary: "#ffffff",
    textSecondary: "#000000",
    backgroundColor: "#ffffff",
  },
};

const generateColor = ():string => {
  const obj = Color.primary.slots;
  const keys = Object.keys(obj);
  const color = keys[Math.floor(Math.random() * keys.length)];
  return obj[color];
};

export {Color,generateColor};
