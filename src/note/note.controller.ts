import { Controller, Get, UseGuards, Req, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/createNote.dto';
import { NoteService } from './note.service';
@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllNotes() {
        return await this.noteService.getAllNotes();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async getNotes(@Req() req) {
        return await this.noteService.getNotes(req.user.id);
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