import { API_URL } from 'shared/constants/api.constant';
import { UniversityType } from 'shared/stores/favourite.store';

export async function getUniversity(name: string): Promise<UniversityType[]> {
  const response = await fetch(`${API_URL}?name=${name}`);
  const json = await response.json();
  return json;
}
