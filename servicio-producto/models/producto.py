from sqlalchemy import Column, Float, Integer, String

from config.database import Base

class Producto(Base):
    __tablename__ = "productos"

    codigo = Column(Integer, primary_key=True, autroincrement=True)
    nombre = Column(String(20))
    descripcion = Column(String(100))
    precio = Column(Float)
    stock = Column(Integer)