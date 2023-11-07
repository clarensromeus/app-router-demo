import productValidation from "./create";

export const editValidation = productValidation.pick({ Price: true });
