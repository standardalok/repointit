import pygame
import sys
import random

# Initialize
pygame.init()

# Screen setup
WIDTH, HEIGHT = 240, 320  # Nokia-style screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Nokia Cricket")
clock = pygame.time.Clock()

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Fonts
font = pygame.font.SysFont("Courier", 20)

# Bat settings
bat_width, bat_height = 10, 40
bat_x = WIDTH - 30
bat_y = HEIGHT // 2 - bat_height // 2

# Ball settings
ball_radius = 5
ball_speed = 4


def show_text(text, y):
    label = font.render(text, True, WHITE)
    screen.blit(label, (10, y))


def main():
    score = 0
    is_out = False
    ball_active = False
    ball_x = 0
    ball_y = HEIGHT // 2
    next_ball_timer = 60  # wait 60 frames before showing next ball
    bat_swing_offset = 0
    swing_cooldown = 0

    running = True

    while running:
        screen.fill(BLACK)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if not is_out and event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and swing_cooldown == 0:
                    bat_swing_offset = -10
                    swing_cooldown = 10

            if is_out and event.type == pygame.KEYDOWN:
                # Restart game
                return main()

        # Bat swing reset
        if swing_cooldown > 0:
            swing_cooldown -= 1
        else:
            bat_swing_offset = 0

        # Handle ball logic
        if not is_out:
            if not ball_active:
                next_ball_timer -= 1
                if next_ball_timer <= 0:
                    ball_x = 0
                    ball_y = random.randint(50, HEIGHT - 50)
                    ball_active = True
            else:
                ball_x += ball_speed

                # Collision detection
                bat_rect = pygame.Rect(bat_x, bat_y + bat_swing_offset, bat_width, bat_height)
                ball_rect = pygame.Rect(ball_x - ball_radius, ball_y - ball_radius, ball_radius * 2, ball_radius * 2)

                if bat_rect.colliderect(ball_rect):
                    score += random.choice([1, 2, 4, 6])
                    ball_active = False
                    next_ball_timer = random.randint(40, 90)

                elif ball_x > WIDTH:
                    is_out = True

        # Draw bat
        pygame.draw.rect(screen, WHITE, (bat_x, bat_y + bat_swing_offset, bat_width, bat_height))

        # Draw ball
        if ball_active:
            pygame.draw.circle(screen, RED, (ball_x, ball_y), ball_radius)

        # Draw score
        show_text(f"Score: {score}", 10)

        # Game over
        if is_out:
            show_text("OUT! Press any key", HEIGHT // 2)

        pygame.display.update()
        clock.tick(30)


if __name__ == "__main__":
    main()
