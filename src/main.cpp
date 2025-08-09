#include <SFML/Graphics.hpp>
#include <iostream>
#include <optional>
class Ship {
public:
  int x;
  int y;
  Ship() {
    x = 50;
    y = 50;
  }
};

int main() {
  auto window = sf::RenderWindow(sf::VideoMode({1920u, 1080u}), "Spacing Out");
  window.setFramerateLimit(144);

  Ship one;

  std::cout << one.x;

  while (window.isOpen()) {
    while (const std::optional event = window.pollEvent()) {
      if (event->is<sf::Event::Closed>()) {
        window.close();
      }
    }

    window.clear();
    window.display();
  }
}
