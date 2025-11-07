# 📊 Diagrama Entidad-Relación - API Recetas del Mundo

## ✅ **Versión Actualizada - Octubre 2025**

### 📋 **Archivos de Diagramas:**

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `er_diagram_actualizado.puml` | ✅ **Diagrama actualizado con BD real** | **NUEVO** |
| `er_diagram.puml` | Diagrama legacy original | Mantenido |
| `er_diagram_auto.png` | Imagen generada automáticamente | Actualizable |

## 🎯 **Información del Diagrama Actualizado**

### **Validación con Base de Datos Real:**
- ✅ **Estructura validada** contra PostgreSQL Docker
- ✅ **Campos confirmados** con `information_schema`
- ✅ **Relaciones FK verificadas** 
- ✅ **Datos de prueba incluidos** (Receta 658 como referencia)

## 🚀 **Instrucciones para generar PNG (opciones actualizadas):**

1) Usando PlantUML (jar local):

   - Descarga plantuml.jar si no lo tienes: https://plantuml.com/download
   - Ejecuta desde la raíz del repo (PowerShell):

```powershell
# desde C:\GitHub\api-recetas_final
java -jar plantuml.jar -tpng docs\er_diagram.puml -o docs
```

El comando genera `docs/er_diagram.png`.

2) Usando Docker (si tienes Docker):

```powershell
docker run --rm -v ${PWD}:/workspace plantuml/plantuml:latest -tpng /workspace/docs/er_diagram.puml -o /workspace/docs
```

3) Usando el servicio online de PlantUML: copia el contenido de `docs/er_diagram.puml` y usa https://plantuml.com/zh/plantuml-server

Incluir en el `README.md`:

    ![ER Diagram](docs/er_diagram.png)

Notas:
- El archivo `docs/er_diagram.puml` contiene la representación del esquema. Renderízalo para obtener la imagen PNG. Si quieres, puedo intentar generar la PNG aquí si me autorizas a ejecutar Docker o si ya tienes `plantuml.jar` en el repositorio.
