#include <SFML/Graphics.hpp>
#include <iostream>
#include <optional>
struct Acceleration {
  int max = 10;
  int x = 0;
  int y = 0;

};

struct Position {
  unsigned int x = 0;
  unsigned int y = 0;
};

struct Ship {
  Position center;
  Position left_wing;
  Position right_wing;
  Position tip;
  unsigned int angle = 0;
  Acceleration acceleration;

};

int main() {
  auto window = sf::RenderWindow(sf::VideoMode({1920u, 1080u}), "Spacing Out");
  window.setFramerateLimit(144);

  // create an empty shape
  sf::ConvexShape convex;

  // resize it to 5 points
  convex.setPointCount(3);

  // define the points
  convex.setPoint(0, {0.f, 0.f});
  convex.setPoint(1, {50.f, 0.f});
  convex.setPoint(2, {25.f, 100.f});
  convex.setOrigin({25.f, 33.f});


  const Ship one;

  std::cout << one.center.x << std::endl;

  while (window.isOpen()) {
    while (const std::optional event = window.pollEvent()) {
      if (event->is<sf::Event::Closed>()) {
        window.close();
      }
    }

    window.clear();
    window.draw(convex);
    convex.rotate(sf::degrees(1));
    convex.setPosition({100.f, 100.f});
    window.display();
  }
}
