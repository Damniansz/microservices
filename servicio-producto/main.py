from fastapi import FastAPI

from config.database import engine, Base
from router.producto_router import router as producto_router

app = FastAPI(
    title="Servicio Prorducto",
    description="Servicio desarrollado en Clases de Arquitectura de Software",
    version="1.0",
    redirect_slashes=False
)

Base.metadata.create_all(bind=engine)

app.include_router(producto_router, prefix="/api")

@app.get("/")
def inicio():
    return {"message": "Servicio Factura ejecutandose con exito"}   