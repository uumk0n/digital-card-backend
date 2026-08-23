import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * The card has exactly one profile, so we just return the first (and only) row,
   * with its skills and experiences ordered for display.
   */
  async getProfile() {
    const profile = await this.prisma.profile.findFirst({
      include: {
        skills: true,
        experiences: { orderBy: { order: 'asc' } },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile is not seeded yet — run `pnpm prisma:seed`.');
    }

    return profile;
  }
}
