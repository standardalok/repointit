import pygame
import random
import sys

# Initialize pygame
pygame.init()




# Game Constants
WIDTH, HEIGHT = 400, 600
FPS = 60
GRAVITY = 0.5
FLAP_STRENGTH = -11
print("enter the mode: \n1.easy\n2.medium\n3.hard")
a=int(input("enter the number;"))
if a==1:
    PIPE_GAP = 300
elif a==2:
    PIPE_GAP = 200
else :
    PIPE_GAP = 150
1
PIPE_WIDTH = 70

# Colors
WHITE = (255, 255, 255)
BLUE = (135, 206, 250)
GREEN = (0, 200, 0)

# Setup display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Flappy Bird")
clock = pygame.time.Clock()

# Fonts
font = pygame.font.SysFont(None, 40)


def draw_text(text, font, color, surface, x, y):
    textobj = font.render(text, True, color)
    textrect = textobj.get_rect(center=(x, y))
    surface.blit(textobj, textrect)


# Bird class
class Bird:
    def __init__(self):
        self.x = 50
        self.y = HEIGHT // 2
        self.velocity = 0
        self.radius = 20

    def flap(self):
        self.velocity = FLAP_STRENGTH

    def move(self):
        self.velocity += GRAVITY
        self.y += self.velocity

    def draw(self):
        pygame.draw.circle(screen, WHITE, (int(self.x), int(self.y)), self.radius)

    def get_rect(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius, self.radius * 2, self.radius * 2)


# Pipe class
class Pipe:
    def __init__(self, x):
        self.x = x
        self.height = random.randint(100, HEIGHT - PIPE_GAP - 100)

    def move(self):
        self.x -= 4

    def draw(self):
        # Top pipe
        pygame.draw.rect(screen, GREEN, (self.x, 0, PIPE_WIDTH, self.height))
        # Bottom pipe
        pygame.draw.rect(screen, GREEN, (self.x, self.height + PIPE_GAP, PIPE_WIDTH, HEIGHT))

    def get_top_rect(self):
        return pygame.Rect(self.x, 0, PIPE_WIDTH, self.height)

    def get_bottom_rect(self):
        return pygame.Rect(self.x, self.height + PIPE_GAP, PIPE_WIDTH, HEIGHT)


# Game loop
def main():
    bird = Bird()
    pipes = [Pipe(WIDTH + 200)]
    score = 0
    running = True
    game_over = False

    while running:
        clock.tick(FPS)
        screen.fill(BLUE)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if not game_over and event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                bird.flap()
            if game_over and event.type == pygame.KEYDOWN:
                main()

        if not game_over:
            bird.move()

            # Add new pipe
            if pipes[-1].x < WIDTH - 200:
                pipes.append(Pipe(WIDTH))

            # Move and draw pipes
            for pipe in pipes:
                pipe.move()
                pipe.draw()

            # Remove off-screen pipes
            pipes = [pipe for pipe in pipes if pipe.x + PIPE_WIDTH > 0]

            # Collision detection
            bird_rect = bird.get_rect()
            for pipe in pipes:
                if bird_rect.colliderect(pipe.get_top_rect()) or bird_rect.colliderect(pipe.get_bottom_rect()):
                    game_over = True

            if bird.y - bird.radius < 0 or bird.y + bird.radius > HEIGHT:
                game_over = True

            # Update score
            for pipe in pipes:
                if pipe.x + PIPE_WIDTH < bird.x and not hasattr(pipe, 'scored'):
                    score += 1
                    pipe.scored = True

        bird.draw()
        draw_text(f"Score: {score}", font, WHITE, screen, WIDTH // 2, 30)

        if game_over:
            draw_text("Game Over", font, WHITE, screen, WIDTH // 2, HEIGHT // 2)
            draw_text("Press any key to restart", font, WHITE, screen, WIDTH // 2, HEIGHT // 2 + 40)

        pygame.display.update()




if __name__ == "__main__":
    main()

print("enter the mode: \n1.easy\n2.medium\n3.hard")
a=int(input("enter the number;"))