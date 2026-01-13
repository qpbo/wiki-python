# Conceptos Avanzados de Python :fire:

Domina las características avanzadas que hacen de Python un lenguaje tan poderoso.

---

## :sparkles: Decoradores

Los decoradores son funciones que modifican el comportamiento de otras funciones.

### Decorador Básico

```python linenums="1" hl_lines="1-5"
def mi_decorador(func):
    def wrapper(*args, **kwargs):
        print("Antes de la función")
        resultado = func(*args, **kwargs)
        print("Después de la función")
        return resultado
    return wrapper

@mi_decorador
def saludar(nombre):
    print(f"¡Hola, {nombre}!")

saludar("Python")
# Output:
# Antes de la función
# ¡Hola, Python!
# Después de la función
```

### Decoradores con Argumentos

=== "Timer Decorator"

    ```python linenums="1"
    import time
    from functools import wraps
    
    def timer(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            inicio = time.time()
            resultado = func(*args, **kwargs)
            fin = time.time()
            print(f"{func.__name__} tardó {fin-inicio:.4f}s")
            return resultado
        return wrapper
    
    @timer
    def operacion_lenta():
        time.sleep(2)
        return "Completado"
    
    operacion_lenta()
    # Output: operacion_lenta tardó 2.0023s
    ```

=== "Cache Decorator"

    ```python linenums="1"
    from functools import lru_cache
    
    @lru_cache(maxsize=None)
    def fibonacci(n):
        if n < 2:
            return n
        return fibonacci(n-1) + fibonacci(n-2)
    
    # Sin cache: muy lento para n>35
    # Con cache: instantáneo
    print(fibonacci(100))  # Calculado en milisegundos
    ```

=== "Retry Decorator"

    ```python linenums="1"
    import time
    from functools import wraps
    
    def retry(max_intentos=3, delay=1):
        def decorador(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                intentos = 0
                while intentos < max_intentos:
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        intentos += 1
                        if intentos >= max_intentos:
                            raise e
                        print(f"Intento {intentos} falló. Reintentando...")
                        time.sleep(delay)
            return wrapper
        return decorador
    
    @retry(max_intentos=5, delay=2)
    def api_request():
        # Simulación de request que puede fallar
        import random
        if random.random() < 0.7:
            raise ConnectionError("Fallo de conexión")
        return "Éxito"
    ```

---

## :infinity: Generadores

Los generadores producen valores bajo demanda, ahorrando memoria.

### Generator Functions

```python linenums="1" hl_lines="5"
def contador(max):
    """Genera números del 0 al max."""
    n = 0
    while n < max:
        yield n  # yield en lugar de return
        n += 1

# Uso
for num in contador(5):
    print(num)  # 0, 1, 2, 3, 4

# Los generadores se pueden iterar una sola vez
gen = contador(3)
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] (agotado)
```

### Generator Expressions

=== "List vs Generator"

    ```python linenums="1"
    # List comprehension - Carga todo en memoria
    lista = [x**2 for x in range(1000000)]
    print(type(lista))  # <class 'list'>
    # Memoria: ~8MB
    
    # Generator expression - Genera bajo demanda
    generador = (x**2 for x in range(1000000))
    print(type(generador))  # <class 'generator'>
    # Memoria: ~200 bytes
    
    # Usar generador
    for i, cuadrado in enumerate(generador):
        if i >= 5:
            break
        print(cuadrado)  # 0, 1, 4, 9, 16
    ```

=== "Pipeline de Generadores"

    ```python linenums="1"
    def leer_archivo_grande(ruta):
        """Lee archivo línea por línea."""
        with open(ruta) as f:
            for linea in f:
                yield linea.strip()
    
    def filtrar_lineas(lineas, palabra):
        """Filtra líneas que contengan una palabra."""
        for linea in lineas:
            if palabra in linea:
                yield linea
    
    def convertir_mayusculas(lineas):
        """Convierte líneas a mayúsculas."""
        for linea in lineas:
            yield linea.upper()
    
    # Pipeline eficiente en memoria
    lineas = leer_archivo_grande("grande.txt")
    filtradas = filtrar_lineas(lineas, "python")
    mayusculas = convertir_mayusculas(filtradas)
    
    # Procesa sin cargar todo en memoria
    for linea in mayusculas:
        print(linea)
    ```

---

## :gear: Context Managers

Gestionan recursos automáticamente usando `with`.

### Using Context Managers

```python linenums="1"
# Sin context manager (malo)
archivo = open("datos.txt", "r")
contenido = archivo.read()
archivo.close()  # ¿Qué pasa si hay error antes?

# Con context manager (bueno) ✅
with open("datos.txt", "r") as archivo:
    contenido = archivo.read()
# Se cierra automáticamente, incluso si hay error
```

### Crear tu Propio Context Manager

=== "Class-Based"

    ```python linenums="1"
    class GestorBaseDatos:
        def __init__(self, nombre):
            self.nombre = nombre
        
        def __enter__(self):
            print(f"Conectando a {self.nombre}")
            self.conexion = self._conectar()
            return self.conexion
        
        def __exit__(self, tipo_exc, valor_exc, traceback):
            print(f"Cerrando conexión a {self.nombre}")
            if self.conexion:
                self.conexion.close()
            return False  # Re-raise exceptions
        
        def _conectar(self):
            # Lógica de conexión
            return {"status": "connected"}
    
    # Uso
    with GestorBaseDatos("MiDB") as db:
        print("Trabajando con DB:", db)
    ```

=== "Decorator-Based"

    ```python linenums="1"
    from contextlib import contextmanager
    import time
    
    @contextmanager
    def temporizador(nombre):
        """Mide el tiempo de ejecución."""
        inicio = time.time()
        try:
            yield
        finally:
            fin = time.time()
            print(f"{nombre} tardó {fin-inicio:.4f}s")
    
    # Uso
    with temporizador("Operación"):
        time.sleep(1)
        resultado = sum(range(1000000))
    ```

---

## :zap: Async/Await (Programación Asíncrona)

Ejecuta código concurrentemente sin threads.

### Async Functions

```python linenums="1" hl_lines="3 8 13"
import asyncio

async def hacer_cafe():
    print("☕ Preparando café...")
    await asyncio.sleep(2)  # Simula operación I/O
    print("☕ Café listo!")
    return "Café"

async def hacer_tostadas():
    print("🍞 Tostando pan...")
    await asyncio.sleep(1)
    print("🍞 Tostadas listas!")
    return "Tostadas"

async def desayuno():
    # Ejecutar concurrentemente
    resultados = await asyncio.gather(
        hacer_cafe(),
        hacer_tostadas()
    )
    print(f"Desayuno: {' y '.join(resultados)}")

# Ejecutar
asyncio.run(desayuno())
# Output:
# ☕ Preparando café...
# 🍞 Tostando pan...
# 🍞 Tostadas listas!  (después de 1s)
# ☕ Café listo!       (después de 2s)
# Desayuno: Café y Tostadas
```

### Async Web Requests

```python linenums="1"
import aiohttp
import asyncio

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_multiple_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        resultados = await asyncio.gather(*tasks)
        return resultados

# Uso
urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3"
]
# asyncio.run(fetch_multiple_urls(urls))
```

---

## :package: Clases Avanzadas

### Dataclasses

```python linenums="1"
from dataclasses import dataclass, field
from typing import List

@dataclass
class Persona:
    nombre: str
    edad: int
    hobbies: List[str] = field(default_factory=list)
    
    def es_mayor_edad(self) -> bool:
        return self.edad >= 18

# Uso
p = Persona("Ana", 25, ["Python", "Música"])
print(p)  # Persona(nombre='Ana', edad=25, hobbies=['Python', 'Música'])
print(p.es_mayor_edad())  # True
```

### Property Decorators

```python linenums="1"
class Temperatura:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, valor):
        if valor < -273.15:
            raise ValueError("Temperatura debajo del cero absoluto")
        self._celsius = valor
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, valor):
        self.celsius = (valor - 32) * 5/9

# Uso
temp = Temperatura(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0
temp.fahrenheit = 86
print(temp.celsius)      # 30.0
```

### Magic Methods (Dunder Methods)

```python linenums="1"
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __add__(self, otro):
        return Vector(self.x + otro.x, self.y + otro.y)
    
    def __mul__(self, escalar):
        return Vector(self.x * escalar, self.y * escalar)
    
    def __eq__(self, otro):
        return self.x == otro.x and self.y == otro.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

# Uso
v1 = Vector(2, 3)
v2 = Vector(1, 4)
print(v1 + v2)      # Vector(3, 7)
print(v1 * 3)       # Vector(6, 9)
print(v1 == v2)     # False
print(len(v1))      # 3
```

---

## :memo: Ejercicios Avanzados

??? example "Ejercicio 1: Decorador de Cache"
    Crea un decorador que cachee resultados de funciones.
    
    ??? check "Solución"
        ```python linenums="1"
        def cache(func):
            cached = {}
            def wrapper(*args):
                if args not in cached:
                    cached[args] = func(*args)
                return cached[args]
            return wrapper
        
        @cache
        def factorial(n):
            if n <= 1:
                return 1
            return n * factorial(n-1)
        
        print(factorial(100))  # Rápido incluso para números grandes
        ```

??? example "Ejercicio 2: Async Downloader"
    Descarga múltiples archivos concurrentemente.
    
    ??? check "Solución"
        ```python linenums="1"
        import asyncio
        import aiohttp
        
        async def descargar_archivo(session, url, nombre):
            async with session.get(url) as response:
                contenido = await response.read()
                with open(nombre, 'wb') as f:
                    f.write(contenido)
                print(f"✅ Descargado: {nombre}")
        
        async def descargar_multiples(urls):
            async with aiohttp.ClientSession() as session:
                tasks = [
                    descargar_archivo(session, url, f"file_{i}.dat")
                    for i, url in enumerate(urls)
                ]
                await asyncio.gather(*tasks)
        ```

---

!!! tip "Siguiente Nivel :rocket:"
    ¿Listo para aplicar estos conceptos? Explora [proyectos prácticos](proyectos.md)!

<div class="text-center py-2xl">
  <a href="proyectos/" class="btn-premium btn-primary">Ver Proyectos :arrow_right:</a>
</div>
