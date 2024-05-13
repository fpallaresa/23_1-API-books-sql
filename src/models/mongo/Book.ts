import mongoose, { type ObjectId } from "mongoose";
const Schema = mongoose.Schema;

const allowedCountries = ["SPAIN", "ITALY", "USA", "GERMANY", "JAPAN"];

export interface IBook {
  title: string;
  author: ObjectId;
  pages: number;
  publisher: {
    name: string;
    country: string;
  }
}

// Creamos el schema del libro
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, "Es imposible que el Título tenga menos de 3 caracteres... dame algo más de detalle"],
      maxLength: [20, "Te pasaste... el Título del libro no puede contener más de 20 caracteres"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: false,
    },
    pages: {
      type: Number,
      required: false,
      min: [1, "Una página no es un libro, es un haiku"],
      max: [1000, "Si un libro tiene más de 1.000 páginas es imposible de leer"],
    },
    publisher: {
      type: {
        name: {
          type: String,
          required: false,
          minLength: [3, "Demasiado corto para una editorial... escribe al menos 3 caracteres"],
          maxLength: [20, "Demasiado largo para una editorial... escribe 20 o menos caracteres"],
          trim: true,
        },
        country: {
          type: String,
          required: false,
          enum: allowedCountries,
          uppercase: true,
          trim: true,
        },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
