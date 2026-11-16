from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import obtener_db
from schemas.producto import ProductoCreate, ProductoResponse
from controllers import producto_controller

router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)

@router.get("/", response_model=list[ProductoResponse])
# Listar productos
def listar_productos(db: Session = Depends(obtener_db)):
    return producto_controller.obtener_productos(db)

#Buscar producto por id
@router.get("/{codigo}", response_model=ProductoResponse)
def buscar_producto(codigo: int, db: Session = Depends(obtener_db)):
    producto = producto_controller.obtener_productos_id(db, codigo)
    if not producto:
        raise HTTPException(400,"Producto no encontrado")
    return producto

#Registrar producto
@router.post("/", response_model=ProductoResponse)
def registrar_producto(producto: ProductoCreate, db: Session = Depends(obtener_db)):
    return producto_controller.crear_producto(db, producto)

#Modificar producto
@router.put("/{codigo}", response_model=ProductoResponse)
def actualizar_producto(codigo: int, producto: ProductoCreate, db: Session = Depends(obtener_db)):
    producto_actualizado = producto_controller.actualizar_producto(db, codigo, producto)
    if not producto_actualizado:
        raise HTTPException(400,"Producto no encontrado")
    return producto_actualizado

#Borrar producto
@router.delete("/{codigo}", response_model=ProductoResponse)
def borrar_producto(codigo: int, db: Session = Depends(obtener_db)):
    producto_eliminado = producto_controller.eliminar_producto(db, codigo)
    if not producto_eliminado:
        raise HTTPException(400,"Producto no encontrado")
    return {"mensaje": "Producto eliminado correctamente"}