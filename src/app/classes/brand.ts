export class Brand {

  constructor (
    private id: number,
    private brandName: string,
    private imagePath: string
  ) {}

  get getId () { return this.id }
  set setId (id: number) {this.id = id}
  get getBrandName () { return this.brandName }
  set setBrandName (brandName: string) {this.brandName = brandName}
  get getImagePath () { return this.imagePath }
  set setImagePath (imagePath: string) {this.imagePath = imagePath}

}
