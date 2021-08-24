import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("items").del();

    // Inserts seed entries
    await knex("items").insert([
        { title: "Papéis e papelão", image: "papel.png" },
        { title: "Vidros e lampadas", image: "vidro.png" },
        { title: "Oleo de cozinha", image: "oleo.png" },
        { title: "Residuos organicos", image: "organico.png"},
        { title: "Eletronicos", image: "eletronicos.png" },
        { title: "Baterias e pilhas", image: "baterias.png" },
    ]);
};
