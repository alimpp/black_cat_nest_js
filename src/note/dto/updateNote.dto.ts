import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './createNote.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
