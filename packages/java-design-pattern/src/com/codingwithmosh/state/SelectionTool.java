package com.codingwithmosh.state;


// ConcreteStateA
public class SelectionTool implements Tool {
    public void mouseDown() {
        System.out.println("Selection icon");
    }

    public void mouseUp() {
        System.out.println("Draw dashed rectangle");
    }
}
