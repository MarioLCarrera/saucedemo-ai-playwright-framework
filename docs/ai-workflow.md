# Registro de trabajo con IA

Cómo uso la IA en este proyecto: propone, yo reviso, verifico contra la aplicación real y corrijo. Cada entrada recoge qué generó la IA, qué cambié yo.

## 1. Plan de pruebas (docs/test-plan.md)

- **Herramienta:** Claude
- **Qué generó:** un borrador de 30 casos en 5 áreas (login, inventario, carrito, checkout y usuarios especiales), con prioridad y si conviene automatizar.
- **Qué corregí:**
  - Los mensajes de error estaban escritos de forma aproximada. Los verifiqué en la web y puse los textos exactos: el prefijo `Epic sadface:` en el login y `Error:` en el checkout.
  - Añadí el resultado exacto de L-02, L-03 y L-07.

## 2. Tests negativos de login (tests/auth/login.spec.ts)

- **Herramienta:** GitHub Copilot, con el plan de pruebas y el Page Object como contexto.
- **Qué generó:** tests parametrizados para L-02 a L-05, el test de acceso directo L-07, los datos tipados en `src/data/users.ts` y métodos nuevos en `LoginPage`.
- **Qué corregí:** El primer test no tenia ID. En users.ts he añadido una breve descripción para que los títulos del bucle sean más claros.
- **Prueba de que el test sirve:** Probé lanzar los tests con un mensaje erróneo para comprobar si se rompía el código.