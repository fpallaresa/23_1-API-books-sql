import express, { type NextFunction, type Response, type Request } from "express";
import { sqlQuery } from "../databases/sql-db";
import { type TechCompaniesBody } from "../models/sql/TechCompanies";
export const techCompaniesRouter = express.Router();

// CRUD: READ
techCompaniesRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await sqlQuery(`
      SELECT *
      FROM tech_companies
    `);
    const response = { data: rows };
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// CRUD: READ
techCompaniesRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const rows = await sqlQuery(`
      SELECT *
      FROM tech_companies
      WHERE id=${id}
    `);

    if (rows?.[0]) {
      const response = { data: rows?.[0] };
      res.json(response);
    } else {
      res.status(404).json({ error: "Tech Company not found" });
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: CREATE
techCompaniesRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, foundedYear, employeesNumber, headquarters, ceo } = req.body as TechCompaniesBody;

    const query: string = `
      INSERT INTO tech_companies (name, released_year, githut_rank, pypl_rank, tiobe_rank)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [name, foundedYear, employeesNumber, headquarters, ceo];

    const result = await sqlQuery(query, params);

    if (result) {
      return res.status(201).json({});
    } else {
      return res.status(500).json({ error: "Tech Company not created" });
    }
  } catch (error) {
    next(error);
  }
});

// CRUD: DELETE
techCompaniesRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await sqlQuery(`
      DELETE FROM tech_companies
      WHERE id = ${id}
    `);

    res.json({ message: "Tech Company deleted!" });
  } catch (error) {
    next(error);
  }
});

// CRUD: UPDATE
techCompaniesRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name, foundedYear, employeesNumber, headquarters, ceo } = req.body as TechCompaniesBody;

    const query = `
      UPDATE tech_companies
      SET name = ?, released_year = ?, githut_rank = ?, pypl_rank = ?, tiobe_rank = ?
      WHERE id = ?
    `;
    const params = [name, foundedYear, employeesNumber, headquarters, ceo, id];
    await sqlQuery(query, params);

    const rows = await sqlQuery(`
      SELECT *
      FROM tech_companies
      WHERE id=${id}
    `);

    if (rows?.[0]) {
      const response = { data: rows?.[0] };
      res.json(response);
    } else {
      res.status(404).json({ error: "Tech Company not found" });
    }
  } catch (error) {
    next(error);
  }
});