import { ICharacter } from 'src/models/dynamic/ICharacter';
import { ImageType } from 'src/models/static/ImageType';
import { InstanceType } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'compute_image_path'
})
export class ComputeImagePathPipe implements PipeTransform {
  transform(
    staticEntity: IStaticEntity,
    imageType: ImageType,
    instanceType: InstanceType,
    character: ICharacter
  ) {
    const { faction } = character.side;
    const { code } = staticEntity;
    
    const nestedPath = `${instanceType}/${faction}/${imageType}/${faction}_${code}.png`;
    return `../../../../../../../../assets/img/entities/${nestedPath}`;
  }
}
