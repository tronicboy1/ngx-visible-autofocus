import { Pipe, PipeTransform } from '@angular/core';
import { DiseaseHistory } from '../member-factory';

@Pipe({
  name: 'diseaseHistory',
})
export class DiseaseHistoryPipe implements PipeTransform {
  static diseaseHistoryText = new Map<DiseaseHistory, string>([
    [DiseaseHistory.Arrhythmia, $localize`不整脈`],
    [DiseaseHistory.Asthma, $localize`喘息`],
    [DiseaseHistory.Cancer, $localize`癌`],
    [DiseaseHistory.Diabetes, $localize`糖尿病`],
    [DiseaseHistory.Eczema, $localize`アトピー体質`],
    [DiseaseHistory.Gout, $localize`痛風`],
    [DiseaseHistory.HeartDisease, $localize`心臓病`],
    [DiseaseHistory.HighBloodPressure, $localize`高血圧`],
    [DiseaseHistory.LipidMetabolismAbnormality, $localize`脂質代謝異常`],
    [DiseaseHistory.Pollinosis, $localize`花粉症`],
    [DiseaseHistory.Stroke, $localize`脳出血/脳梗塞`],
    [DiseaseHistory.Other, $localize`その他`],
  ]);

  transform(value: DiseaseHistory): string {
    return DiseaseHistoryPipe.diseaseHistoryText.get(value) ?? '';
  }
}
