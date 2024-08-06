import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/create-brand">브랜드 생성</Link></li>
                <li><Link to="/update-brand">브랜드 수정</Link></li>
                <li><Link to="/remove-brand">브랜드 삭제</Link></li>
                <li><Link to="/lowest-price-brands">최저가 셋트 제공 브랜드</Link></li>
                <li><Link to="/create-product">상품 생성</Link></li>
                <li><Link to="/remove-product">상품 삭제</Link></li>
                <li><Link to="/category-min-price">카테고리 별 최저가격 브랜드와 상품 가격, 총액 조회</Link></li>
                <li><Link to="/category-price-range">카테고리 이름으로 최저, 최고 가격 브랜드와 상품 가격 조회</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;