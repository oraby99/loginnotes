import { Router } from '@angular/router';


export class Helper {



  public static refreshComponent(router: Router, url: any) {
    router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      router.navigate([url]);
    });
    setTimeout(() => {
      let doc: any = document;
      doc.jquery('.modal-backdrop fade in').remove();
    }, 1000);
  }

  /**
   * translate word
   *
   * @param word
   */

  public static print() {
    let doc: any = document;
    doc.printJs();
  }


  public static setFile(event: { target: { files: any[]; }; }, key: string | number, model: { [x: string]: any; }) {
    model[key] = event.target.files[0];
  }
  public static toFormData(resource: { [x: string]: string | Blob; }) {
    let data = new FormData();
    for(let key of Object.keys(resource)) {
      if(resource[key])
        data.append(key, resource[key]);
    }
    return data;
  }
  public static loadImage(event: { target: { files: any[]; }; }, key: string, model: { [x: string]: any; }) {
    Helper.setFile(event, key, model);
    var reader = new FileReader();
    reader.readAsDataURL(model[key]);
    reader.onload = (_event) => {
      model[key+"_url"] = reader.result;
    }
  }
  /**
   * convert javascript object to formData object
   * @param resource java script object
   * @returns FormData object
   */



  /**
   * open new window in the browser
   *
   * @param url: String url of the page
   */

  /**
   * validate on object from array of attributes
   *
   * @param model
   * @param requireds
   */

}

