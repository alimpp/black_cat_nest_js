import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/createNote.dto';
import { NoteService } from './note.service';
import { UsersService } from 'src/users/users.service';

interface User {
    id: number;
    fristname: string;
    lastname: string;
    email: string;
    avatarUrl: string;
    bio: string;
    password: string;
}

interface Notes {
    id: number,
    note: string,
    authorId: number,
    author: User,
    created_at: Date
}


@Controller('note')
export class NoteController {
    constructor(
        private readonly noteService: NoteService,
        private readonly usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllNotes() {
        const notes = await this.noteService.getAllNotes();
        let result: Notes[] = [];
        for (let key of notes) {
            const author = await this.usersService.getUserById(key.authorId);
            const obj: Notes = {
                ...key,
                author
            };
            result.push(obj);
        }
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getNotes(@Req() req) {
        const notes = await this.noteService.getNotes(req.user.id);
        let result: any[] = [];
        for (let key of notes) {
            const author = await this.usersService.getUserById(key.authorId);
            const obj: any = {
                ...key,
                author
            };
            result.push(obj);
        }
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addNote(@Req() req, @Body() body: CreateNoteDto) {
        return await this.noteService.addNote({ note: body.note, authorId: req.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeNote(@Req() req, @Param('id') id: number) {
        return await this.noteService.removeNote(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateNote(@Req() req, @Param('id') id: number, @Body() body: CreateNoteDto) {
        return await this.noteService.updateNote(id, { note: body.note, authorId: req.user.id });
    }
}