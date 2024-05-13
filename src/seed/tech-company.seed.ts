import { sqlQuery, sqlConnect } from "../databases/sql-db";

const companyList = [
    {
      name: "Google",
      foundedYear: 1998,
      employeesNumber: 100000,
      headquarters: "Mountain View, California, United States",
      ceo: "Sundar Pichai",
    },
    {
      name: "Apple",
      foundedYear: 1976,
      employeesNumber: 147000,
      headquarters: "Cupertino, California, United States",
      ceo: "Tim Cook",
    },
    {
      name: "Microsoft",
      foundedYear: 1975,
      employeesNumber: 181000,
      headquarters: "Redmond, Washington, United States",
      ceo: "Satya Nadella",
    },
  ];
  
const seedDatabase = async () => {
  try {
    const connection = await sqlConnect();
    
    for (const company of companyList) {
      const { name, foundedYear, employeesNumber, headquarters, ceo } = company;
      const query = `
        INSERT INTO companies (name, foundedYear, employeesNumber, headquarters, ceo) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const params = [name, foundedYear, employeesNumber, headquarters, ceo];
      await sqlQuery(query, params);
      console.log(`Company '${name}' inserted into the database.`);
    }
    
    connection.end(); // Cerrar la conexión después de terminar la inserción
    console.log("Seed data insertion completed.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

seedDatabase();
