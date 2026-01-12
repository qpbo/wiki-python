# Bienvenido a la Python Wiki

Esta documentación demuestra el uso avanzado de **MkDocs** con **Material Theme**. A continuación, verás ejemplos de interactividad, diagramas y sintaxis compleja.

---

## 1. Pestañas de Código (Content Tabs)

Esta funcionalidad permite mostrar la misma solución en diferentes lenguajes sin ocupar espacio extra. Ideal para comparar sintaxis.

=== "Python"

    ```python
    def saludar(nombre):
        """Saluda al usuario."""
        return f"Hola, {nombre}"

    print(saludar("Mundo"))
    ```

=== "JavaScript"

    ```javascript
    function saludar(nombre) {
        return `Hola, ${nombre}`;
    }

    console.log(saludar("Mundo"));
    ```

=== "C++"

    ```cpp
    #include <iostream>
    using namespace std;

    int main() {
        string nombre = "Mundo";
        cout << "Hola, " << nombre;
        return 0;
    }
    ```

---

## 2. Bloques Colapsables (Details)

Útil para ejercicios, soluciones o contenido extenso que no debe saturar la vista inicial.

??? note "Ejercicio: ¿Cuál es la salida de `print(3 * '7')`?"
    **Solución:**
    
    La salida es `777`.
    
    En Python, multiplicar un string por un entero repite el string esa cantidad de veces.

??? failure "Click para ver un error común"
    No intentes dividir por cero.
    ```python
    x = 1 / 0  # ZeroDivisionError
    ```

---

## 3. Admonitions (Alertas)

Cajas semánticas para resaltar información crítica.

!!! tip "Consejo Pro"
    Utiliza entornos virtuales (`venv`) para aislar las dependencias de tus proyectos.

!!! warning "Cuidado con la Indentación"
    Python es estricto. Un espacio mal colocado puede romper tu código.

!!! danger "Zona Peligrosa"
    Borrar la base de datos de producción un viernes a las 17:00.

---

## 4. Diagramas como Código (Mermaid)

Generación de gráficos directamente desde Markdown, sin necesidad de imágenes externas.

```mermaid
graph TD
    A[Inicio] --> B{¿Está instalado Python?};
    B -- Sí --> C[Escribir Código];
    B -- No --> D[Instalar Python];
    D --> B;
    C --> E[Ejecutar Script];
    E --> F{¿Funciona?};
    F -- Sí --> G[Celebrar];
    F -- No --> H[Depurar / StackOverflow];
    H --> C;