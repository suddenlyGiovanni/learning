package com.codingwithmosh.state;

// ConcreteStateB
public class BrushTool implements Tool {
    public void mouseDown() {
        System.out.println("Brush icon");
    }

    public void mouseUp() {
        System.out.println("Draw line");
    }
}
