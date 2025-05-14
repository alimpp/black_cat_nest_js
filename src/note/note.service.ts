import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from 'src/entities/note.entity';

interface CreateNoteDto {
    authorId: number;
    note: string;
}

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private readonly noteRepository: Repository<NoteEntity>,
    ) {}

    async getAllNotes() {
        return await this.noteRepository.find();
    }

    async getNotes(id: number) {
        return await this.noteRepository.find({ where: { authorId: id } });
    }

    async addNote(body: CreateNoteDto) {
        const note = this.noteRepository.create(body);
        return await this.noteRepository.save(note);
    }

    async removeNote(id: number) {
        return await this.noteRepository.delete(id);
    }

    async updateNote(id: number, body: CreateNoteDto) {
        return await this.noteRepository.update(id, body);
    }
}
