import { TagType } from '../services/TagTypeService'

export default interface MarkData{
  shownTagType?: TagType;
  tagTypes?: TagType[];
}
