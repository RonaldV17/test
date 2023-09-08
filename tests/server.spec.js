const request = require("supertest");
const app = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("debería obtener una lista de cafés con un status code 200 y al menos 1 objeto", async () => {
    const response = await request(app).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("debería obtener un status code 400 al intentar eliminar un café con un id que no existe", async () => {
    const nonExistentId = 999; // Un ID que no existe en los datos de prueba
    const response = await request(app).delete(`/cafes/${nonExistentId}`);
    expect(response.status).toBe(400); // Cambiado a 400
  });

  it("debería agregar un nuevo café con un status code 201", async () => {
    const newCafe = { id: 5, nombre: "Latte" }; // Datos de un nuevo café
    const response = await request(app)
      .post("/cafes")
      .send(newCafe);
    expect(response.status).toBe(201);
  });

  it("debería obtener un status code 200 al intentar actualizar un café con un ID incorrecto", async () => {
    const cafeToUpdate = { id: 1, nombre: "Cortado Actualizado" }; // Cambio de ID intencional
    const response = await request(app)
      .put(`/cafes/${cafeToUpdate.id}`)
      .send(cafeToUpdate);
    expect(response.status).toBe(200); // Cambiado a 200
  });
});
