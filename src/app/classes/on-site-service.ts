export class OnSiteService {
  constructor (
    private id: number,
    private onSiteServiceName: string,
    private description: string,
    private price: number,
    private duree: number,
    private imagePath: string,
  ) {}

  get getId () { return this.id }
  set setId (id: number) {this.id = id}
  get getOnSiteServiceName () { return this.onSiteServiceName }
  set setOnSiteServiceName (onSiteServiceName: string) {this.onSiteServiceName = onSiteServiceName}
  get getDescription () { return this.description }
  set setDescription (description: string) {this.description = description}
  get getPrice () { return this.price }
  set setPrice (price: number) {this.price = price}
  get getDuree () { return this.duree }
  set setDuree (duree: number) {this.duree = duree}
  get getImagePath () { return this.imagePath }
  set setImagePath (imagePath: string) {this.imagePath = imagePath}

}
