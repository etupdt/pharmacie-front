import { Type } from "../enums/type"
import { Brand } from "./brand"

export class Product {

  constructor (
    private id: number,
    private productName: string,
    private label: string,
    private price: number,
    private stock: number,
    private brand: Brand,
    private imagePath: string,
    private type: Type
  ) {}

  get getId () { return this.id }
  set setId (id: number) {this.id = id}
  get getProductName () { return this.productName }
  set setProductName (productName: string) {this.productName = productName}
  get getLabel () { return this.label }
  set setLabel (label: string) {this.label = label}
  get getPrice () { return this.price }
  set setPrice (price: number) {this.price = price}
  get getStock () { return this.stock }
  set setStock (stock: number) {this.stock = stock}
  get getBrand () { return this.brand }
  set setBrand (brand: Brand) {this.brand = brand}
  get getImagePath () { return this.imagePath }
  set setImagePath (imagePath: string) {this.imagePath = imagePath}
  get getType () { return this.type }
  set setType (type: Type) {this.type = type}

  deserialize(data: any): Product {

    this.id = data.id
    this.productName = data.productName
    this.label = data.label
    this.price = data.price
    this.stock = data.stock
    this.brand = data.brand
    this.imagePath = data.imagePath
    this.type = data.type

    return this

  }

}
