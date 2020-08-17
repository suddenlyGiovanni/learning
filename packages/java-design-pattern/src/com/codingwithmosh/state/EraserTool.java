package com.codingwithmosh.state;

public class EraserTool implements Tool {
    @Override
    public void mouseDown() {
        System.out.println("Erase icon");
    }

    @Override
    public void mouseUp() {
        System.out.println("Erase something");
    }
}
